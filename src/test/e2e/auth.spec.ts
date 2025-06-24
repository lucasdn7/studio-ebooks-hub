import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login page correctly', async ({ page }) => {
    await page.goto('/login');
    
    await expect(page).toHaveTitle(/Studio eBooks/);
    await expect(page.locator('h1')).toContainText(/Login/);
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/login');
    
    const emailInput = page.locator('input[type="email"]');
    const submitButton = page.locator('button[type="submit"]');
    
    // Test invalid email
    await emailInput.fill('invalid-email');
    await submitButton.click();
    
    // Should show validation error
    await expect(page.locator('.text-red-500')).toBeVisible();
  });

  test('should validate password requirements', async ({ page }) => {
    await page.goto('/login');
    
    const passwordInput = page.locator('input[type="password"]');
    const submitButton = page.locator('button[type="submit"]');
    
    // Test weak password
    await passwordInput.fill('weak');
    await submitButton.click();
    
    // Should show validation error
    await expect(page.locator('.text-red-500')).toBeVisible();
  });

  test('should navigate to signup page', async ({ page }) => {
    await page.goto('/login');
    
    const signupLink = page.locator('a[href="/auth"]');
    await signupLink.click();
    
    await expect(page).toHaveURL(/.*\/auth/);
  });

  test('should handle successful login', async ({ page }) => {
    // Mock successful login
    await page.route('**/auth/v1/token?grant_type=password', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          access_token: 'mock-token',
          refresh_token: 'mock-refresh-token',
          user: {
            id: 'mock-user-id',
            email: 'test@example.com'
          }
        })
      });
    });

    await page.goto('/login');
    
    await page.locator('input[type="email"]').fill('test@example.com');
    await page.locator('input[type="password"]').fill('StrongPass123');
    await page.locator('button[type="submit"]').click();
    
    // Should redirect to member area
    await expect(page).toHaveURL(/.*\/member-area/);
  });

  test('should handle login errors', async ({ page }) => {
    // Mock failed login
    await page.route('**/auth/v1/token?grant_type=password', async route => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Invalid login credentials'
        })
      });
    });

    await page.goto('/login');
    
    await page.locator('input[type="email"]').fill('test@example.com');
    await page.locator('input[type="password"]').fill('wrongpassword');
    await page.locator('button[type="submit"]').click();
    
    // Should show error message
    await expect(page.locator('.text-red-500')).toBeVisible();
  });
});

test.describe('Protected Routes', () => {
  test('should redirect unauthenticated users from protected routes', async ({ page }) => {
    await page.goto('/member-area');
    
    // Should redirect to login
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('should allow authenticated users to access protected routes', async ({ page }) => {
    // Mock authenticated session
    await page.addInitScript(() => {
      localStorage.setItem('supabase.auth.token', JSON.stringify({
        access_token: 'mock-token',
        refresh_token: 'mock-refresh-token',
        user: {
          id: 'mock-user-id',
          email: 'test@example.com'
        }
      }));
    });

    await page.goto('/member-area');
    
    // Should access the protected route
    await expect(page).toHaveURL(/.*\/member-area/);
  });
}); 