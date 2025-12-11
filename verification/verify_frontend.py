from playwright.sync_api import sync_playwright

def verify_dashboard():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Go to the dashboard (Vite falls back to 3001 if 3000 is taken by backend)
            page.goto("http://localhost:3001")

            # Wait for data to load (missions, goals, etc.)
            # "Misión del día" is static text, but it confirms page loaded.
            page.wait_for_selector("text=Misión del día")

            # Wait for dynamic data to confirm fetch worked.
            # MOCK_MISSIONS in backend has "Fundamentos de HTML"
            page.wait_for_selector("text=Fundamentos de HTML", timeout=10000)

            # Wait for user data (GamificationPanel)
            # MOCK_USER in backend has "Silviu" (not displayed directly maybe? "Nvl 7")
            # GamificationPanel shows "Nvl 7"
            page.wait_for_selector("text=Nvl 7", timeout=10000)

            # Take screenshot of Dashboard
            page.screenshot(path="verification/dashboard.png")
            print("Dashboard screenshot taken.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_dashboard()
