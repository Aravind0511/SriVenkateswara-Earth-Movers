import http.server
import socketserver
import threading
import time
import requests
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

PORT = 4180
DIRECTORY = os.path.join(os.path.dirname(__file__), '..', 'dist')

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Suppress standard logging to keep output clean
        pass

print("=== STARTING LOCAL WEB SERVER VERIFICATION ===")
httpd = socketserver.TCPServer(("", PORT), Handler)
server_thread = threading.Thread(target=httpd.serve_forever)
server_thread.daemon = True
server_thread.start()
time.sleep(0.5)

passed = 0
failed = 0

def check(condition, desc):
    global passed, failed
    if condition:
        print(f"✅ PASSED: {desc}")
        passed += 1
    else:
        print(f"❌ FAILED: {desc}")
        failed += 1

try:
    base = f"http://localhost:{PORT}"

    # 1. Root page
    r = requests.get(f"{base}/index.html", timeout=5)
    check(r.status_code == 200, f"Local index.html served (Status {r.status_code})")
    check('<div id="root"></div>' in r.text, "Index contains #root mount point")

    # 2. 404 fallback
    r_404 = requests.get(f"{base}/404.html", timeout=5)
    check(r_404.status_code == 200, f"Local 404.html served (Status {r_404.status_code})")

    # 3. Logo and Key Equipment Images
    r_logo = requests.get(f"{base}/logo.jpg", timeout=5)
    check(r_logo.status_code == 200 and len(r_logo.content) > 5000, "Logo image served correctly")

    r_fleet = requests.get(f"{base}/equipment/all-vehicles-fleet.jpg", timeout=5)
    check(r_fleet.status_code == 200 and len(r_fleet.content) > 5000, "All Vehicles Fleet image served")

    r_lr = requests.get(f"{base}/equipment/hitachi-50ft-long-reach-v2.jpg", timeout=5)
    check(r_lr.status_code == 200 and len(r_lr.content) > 5000, "50ft Long Reach image served")

    # 4. Inspect Assets Directory
    assets_dir = os.path.join(DIRECTORY, 'assets')
    booking_js = [f for f in os.listdir(assets_dir) if f.startswith('BookingPage') and f.endswith('.js')]
    check(len(booking_js) > 0, f"Found BookingPage chunk: {booking_js[0] if booking_js else 'None'}")

    booking_css = [f for f in os.listdir(assets_dir) if f.startswith('BookingPage') and f.endswith('.css')]
    check(len(booking_css) > 0, f"Found BookingPage CSS chunk: {booking_css[0] if booking_css else 'None'}")

    if booking_js:
        r_bjs = requests.get(f"{base}/assets/{booking_js[0]}", timeout=5)
        check(r_bjs.status_code == 200, "BookingPage JS chunk loaded over HTTP")
        check("9944745410" in r_bjs.text, "BookingPage contains owner phone 9944745410")
        check("Full Name / Contractor Name" in r_bjs.text or "custName" in r_bjs.text, "BookingPage contains streamlined name field")
        check("Book on WhatsApp" in r_bjs.text, "BookingPage contains direct WhatsApp action")
        check("Complete Fleet Package" in r_bjs.text, "BookingPage contains Complete Fleet Package")

    if booking_css:
        r_bcss = requests.get(f"{base}/assets/{booking_css[0]}", timeout=5)
        check(r_bcss.status_code == 200, "BookingPage CSS chunk loaded over HTTP")
        check("svem-booking-simple-layout" in r_bcss.text or "svem-simple-card" in r_bcss.text, "BookingPage CSS contains simple 2-column layout classes")

finally:
    httpd.shutdown()
    httpd.server_close()

print(f"\nLocal Server Verification Summary: {passed} passed, {failed} failed.")
if failed > 0:
    sys.exit(1)
