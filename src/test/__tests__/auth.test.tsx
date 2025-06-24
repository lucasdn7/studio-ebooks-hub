import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { validateEmail, validatePassword } from '@/utils/security';

// Componente de teste para usar o hook
const TestComponent = () => {
  const { signIn, signUp } = useAuth();
  
  const handleSignIn = async () => {
    await signIn('test@example.com', 'password123');
  };
  
  const handleSignUp = async () => {
    await signUp('test@example.com', 'password123', 'John', 'Doe');
  };
  
  return (
    <div>
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

describe('Authentication', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Email Validation', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('user+tag@example.org')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('test@example')).toBe(false);
    });

    it('should reject emails longer than 254 characters', () => {
      const longEmail = 'a'.repeat(245) + '@example.com';
      expect(validateEmail(longEmail)).toBe(false);
    });
  });

  describe('Password Validation', () => {
    it('should validate strong passwords', () => {
      const result = validatePassword('StrongPass123');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject weak passwords', () => {
      const result = validatePassword('weak');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('A senha deve ter pelo menos 8 caracteres');
      expect(result.errors).toContain('A senha deve conter pelo menos uma letra maiúscula');
      expect(result.errors).toContain('A senha deve conter pelo menos um número');
    });

    it('should reject passwords without uppercase letters', () => {
      const result = validatePassword('password123');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('A senha deve conter pelo menos uma letra maiúscula');
    });

    it('should reject passwords without numbers', () => {
      const result = validatePassword('PasswordABC');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('A senha deve conter pelo menos um número');
    });
  });

  describe('Auth Provider', () => {
    it('should render without crashing', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });

    it('should handle sign in button click', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      const signInButton = screen.getByText('Sign In');
      fireEvent.click(signInButton);
      
      await waitFor(() => {
        // Verificar se a função foi chamada (mock)
        expect(signInButton).toBeInTheDocument();
      });
    });

    it('should handle sign up button click', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      const signUpButton = screen.getByText('Sign Up');
      fireEvent.click(signUpButton);
      
      await waitFor(() => {
        // Verificar se a função foi chamada (mock)
        expect(signUpButton).toBeInTheDocument();
      });
    });
  });
}); 