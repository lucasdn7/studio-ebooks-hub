// Backup and recovery system for data protection

interface BackupData {
  id: string;
  timestamp: string;
  type: 'full' | 'incremental' | 'user_data';
  data: Record<string, unknown>;
  size: number;
  checksum: string;
  version: string;
}

interface BackupConfig {
  autoBackup: boolean;
  backupInterval: number; // minutes
  maxBackups: number;
  backupTypes: ('full' | 'incremental' | 'user_data')[];
  compression: boolean;
  encryption: boolean;
}

class BackupManager {
  private config: BackupConfig;
  private backups: BackupData[] = [];
  private lastBackupTime: number = 0;
  private isBackingUp = false;

  constructor(config: Partial<BackupConfig> = {}) {
    this.config = {
      autoBackup: true,
      backupInterval: 60, // 1 hour
      maxBackups: 10,
      backupTypes: ['user_data'],
      compression: true,
      encryption: false,
      ...config
    };

    this.loadBackups();
    this.startAutoBackup();
  }

  private loadBackups(): void {
    try {
      const stored = localStorage.getItem('app_backups');
      if (stored) {
        this.backups = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load backups:', error);
    }
  }

  private saveBackups(): void {
    try {
      localStorage.setItem('app_backups', JSON.stringify(this.backups));
    } catch (error) {
      console.error('Failed to save backups:', error);
    }
  }

  private startAutoBackup(): void {
    if (!this.config.autoBackup) return;

    setInterval(() => {
      const now = Date.now();
      const timeSinceLastBackup = now - this.lastBackupTime;
      const intervalMs = this.config.backupInterval * 60 * 1000;

      if (timeSinceLastBackup >= intervalMs) {
        this.createBackup('user_data');
      }
    }, 60000); // Check every minute
  }

  async createBackup(type: 'full' | 'incremental' | 'user_data'): Promise<BackupData | null> {
    if (this.isBackingUp) {
      console.warn('Backup already in progress');
      return null;
    }

    this.isBackingUp = true;

    try {
      const data = await this.collectData(type);
      const compressed = this.config.compression ? await this.compress(data) : data;
      const checksum = await this.calculateChecksum(compressed);

      const backup: BackupData = {
        id: this.generateBackupId(),
        timestamp: new Date().toISOString(),
        type,
        data: compressed,
        size: JSON.stringify(compressed).length,
        checksum,
        version: '1.0.0'
      };

      this.backups.push(backup);
      this.lastBackupTime = Date.now();

      // Cleanup old backups
      this.cleanupOldBackups();

      this.saveBackups();
      console.log(`Backup created: ${backup.id} (${type})`);
      return backup;
    } catch (error) {
      console.error('Failed to create backup:', error);
      return null;
    } finally {
      this.isBackingUp = false;
    }
  }

  private async collectData(type: 'full' | 'incremental' | 'user_data'): Promise<Record<string, unknown>> {
    const data: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      type,
      userData: {},
      settings: {},
      cache: {}
    };

    // Collect user data
    if (type === 'user_data' || type === 'full') {
      data.userData = {
        favorites: this.getLocalStorageData('user_favorites'),
        preferences: this.getLocalStorageData('user_preferences'),
        readingProgress: this.getLocalStorageData('reading_progress'),
        achievements: this.getLocalStorageData('user_achievements')
      };
    }

    // Collect settings
    if (type === 'full') {
      data.settings = {
        theme: localStorage.getItem('theme'),
        language: localStorage.getItem('language'),
        notifications: localStorage.getItem('notifications')
      };
    }

    // Collect cache data
    if (type === 'full') {
      data.cache = this.getCacheData();
    }

    return data;
  }

  private getLocalStorageData(prefix: string): Record<string, unknown> {
    const data: Record<string, unknown> = {};
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          data[key] = localStorage.getItem(key);
        }
      }
    } catch (error) {
      console.error('Failed to get localStorage data:', error);
    }
    return data;
  }

  private getCacheData(): Record<string, unknown> {
    // This would collect cache data from your cache system
    return {
      apiCache: {},
      imageCache: {},
      userDataCache: {}
    };
  }

  private async compress(data: Record<string, unknown>): Promise<Record<string, unknown>> {
    // Simple compression - in production, use a proper compression library
    const jsonString = JSON.stringify(data);
    return {
      compressed: true,
      originalSize: jsonString.length,
      data: jsonString
    };
  }

  private async calculateChecksum(data: Record<string, unknown>): Promise<string> {
    const jsonString = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < jsonString.length; i++) {
      const char = jsonString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(16);
  }

  private generateBackupId(): string {
    return `backup_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  }

  private cleanupOldBackups(): void {
    if (this.backups.length <= this.config.maxBackups) return;

    // Sort by timestamp (oldest first)
    this.backups.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    // Remove oldest backups
    const toRemove = this.backups.length - this.config.maxBackups;
    this.backups.splice(0, toRemove);
  }

  async restoreBackup(backupId: string): Promise<boolean> {
    const backup = this.backups.find(b => b.id === backupId);
    if (!backup) {
      console.error('Backup not found:', backupId);
      return false;
    }

    try {
      // Verify checksum
      const currentChecksum = await this.calculateChecksum(backup.data);
      if (currentChecksum !== backup.checksum) {
        console.error('Backup checksum verification failed');
        return false;
      }

      // Decompress if needed
      const data = backup.data.compressed ? await this.decompress(backup.data) : backup.data;

      // Restore data
      await this.restoreData(data);

      console.log(`Backup restored: ${backupId}`);
      return true;
    } catch (error) {
      console.error('Failed to restore backup:', error);
      return false;
    }
  }

  private async decompress(data: Record<string, unknown>): Promise<Record<string, unknown> | null> {
    if (!data.compressed) return data;

    try {
      const jsonString = data.data as string;
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Failed to decompress backup data:', error);
      return null;
    }
  }

  private async restoreData(data: Record<string, unknown>): Promise<void> {
    // Restore user data
    if (data.userData) {
      const userData = data.userData as Record<string, unknown>;
      Object.entries(userData).forEach(([key, value]) => {
        if (typeof value === 'string') {
          localStorage.setItem(key, value);
        }
      });
    }

    // Restore settings
    if (data.settings) {
      const settings = data.settings as Record<string, unknown>;
      Object.entries(settings).forEach(([key, value]) => {
        if (typeof value === 'string') {
          localStorage.setItem(key, value);
        }
      });
    }

    // Restore cache (if needed)
    if (data.cache) {
      // This would restore cache data to your cache system
      console.log('Cache restoration not implemented');
    }
  }

  getBackups(): BackupData[] {
    return [...this.backups].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  deleteBackup(backupId: string): boolean {
    const index = this.backups.findIndex(b => b.id === backupId);
    if (index === -1) return false;

    this.backups.splice(index, 1);
    this.saveBackups();
    return true;
  }

  exportBackup(backupId: string): string | null {
    const backup = this.backups.find(b => b.id === backupId);
    if (!backup) return null;

    return JSON.stringify(backup, null, 2);
  }

  importBackup(backupData: string): boolean {
    try {
      const backup: BackupData = JSON.parse(backupData);
      
      // Validate backup structure
      if (!backup.id || !backup.timestamp || !backup.data) {
        throw new Error('Invalid backup format');
      }

      // Check if backup already exists
      const exists = this.backups.some(b => b.id === backup.id);
      if (exists) {
        backup.id = this.generateBackupId();
      }

      this.backups.push(backup);
      this.saveBackups();
      return true;
    } catch (error) {
      console.error('Failed to import backup:', error);
      return false;
    }
  }

  getBackupStats(): {
    totalBackups: number;
    totalSize: number;
    lastBackupTime: number;
    autoBackupEnabled: boolean;
  } {
    const totalSize = this.backups.reduce((sum, backup) => sum + backup.size, 0);
    
    return {
      totalBackups: this.backups.length,
      totalSize,
      lastBackupTime: this.lastBackupTime,
      autoBackupEnabled: this.config.autoBackup
    };
  }
}

// Create global instance
export const backupManager = new BackupManager();

// Export convenience functions
export const createBackup = (type: 'full' | 'incremental' | 'user_data' = 'user_data') => {
  return backupManager.createBackup(type);
};

export const restoreBackup = (backupId: string) => {
  return backupManager.restoreBackup(backupId);
};

export const getBackups = () => {
  return backupManager.getBackups();
};

export const deleteBackup = (backupId: string) => {
  return backupManager.deleteBackup(backupId);
};

export const exportBackup = (backupId: string) => {
  return backupManager.exportBackup(backupId);
};

export const importBackup = (backupData: string) => {
  return backupManager.importBackup(backupData);
}; 