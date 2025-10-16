import { Heart, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AnimeVerse
            </h3>
            <p className="text-sm text-muted-foreground">
              Your ultimate destination for discovering anime and manga. Powered by
              MyAnimeList data.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Trending Anime
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Top Rated
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Upcoming
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Manga
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Genres</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Action
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Romance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Fantasy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Sci-Fi
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 AnimeVerse. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 fill-accent text-accent" /> for anime fans
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
