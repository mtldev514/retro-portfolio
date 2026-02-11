import http.server
import socketserver
import os
import argparse
import sys

class RetroHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler to serve engine files while mapping data requests"""
    
    engine_dir = "."
    data_dir = "."

    def translate_path(self, path):
        # Remove query parameters
        path = path.split('?')[0]
        
        # Determine if this is a request for content or engine
        parts = path.strip("/").split("/")
        first_part = parts[0] if parts else ""

        if first_part in ["data", "config", "lang", ".env"]:
            # Route to personal data directory
            return os.path.join(self.data_dir, *parts)
        else:
            # Route to engine directory
            return os.path.join(self.engine_dir, *parts)

def run(engine_dir, data_dir, port=8000):
    RetroHandler.engine_dir = os.path.abspath(engine_dir)
    RetroHandler.data_dir = os.path.abspath(data_dir)
    
    with socketserver.TCPServer(("", port), RetroHandler) as httpd:
        print(f"🚀 Retro Portfolio Engine running!")
        print(f"📁 Engine: {RetroHandler.engine_dir}")
        print(f"📁 Data:   {RetroHandler.data_dir}")
        print(f"🌐 URL:    http://localhost:{port}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Stopping engine...")
            sys.exit(0)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Retro Portfolio Engine CLI")
    parser.add_argument("--data", default=".", help="Path to your content directory (config/, data/, lang/)")
    parser.add_argument("--port", type=int, default=8000, help="Port to run on")
    
    args = parser.parse_args()
    
    # Engine is always where this script is or the current CWD
    run(".", args.data, args.port)
