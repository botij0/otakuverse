import { Link } from "react-router";
import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <h3 className="font-title text-lg tracking-tight text-foreground">
              Otaku<span className="text-primary">Verse</span>
            </h3>
            <p className="text-sm text-muted-foreground max-w-[36ch] leading-relaxed">
              Discover anime and manga with ratings, seasons, and recommendations. Data from MyAnimeList.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-foreground">Anime</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/anime/top" className="hover:text-primary transition-colors">
                  Top Anime
                </Link>
              </li>
              <li>
                <Link to="/anime/seasonal" className="hover:text-primary transition-colors">
                  Seasonal Anime
                </Link>
              </li>
              <li>
                <Link to="/anime/search" className="hover:text-primary transition-colors">
                  Search Anime
                </Link>
              </li>
              <li>
                <Link to="/anime/recommendations" className="hover:text-primary transition-colors">
                  Recommendations
                </Link>
              </li>
              <li>
                <Link to="/anime/build-your-top" className="hover:text-primary transition-colors">
                  Build Your Top
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-foreground">Manga</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/manga/top" className="hover:text-primary transition-colors">
                  Top Manga
                </Link>
              </li>
              <li>
                <Link to="/manga/search" className="hover:text-primary transition-colors">
                  Search Manga
                </Link>
              </li>
              <li>
                <Link to="/manga/recommendations" className="hover:text-primary transition-colors">
                  Recommendations
                </Link>
              </li>
              <li>
                <Link to="/manga/build-your-top" className="hover:text-primary transition-colors">
                  Build Your Top
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Characters</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/character/top" className="hover:text-primary transition-colors">
                    Top Characters
                  </Link>
                </li>
                <li>
                  <Link to="/character/search" className="hover:text-primary transition-colors">
                    Search Character
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Connect</h4>
              <div className="flex gap-3">
                <a
                  href="https://github.com/botij0"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/javier-gonzalez-soldado/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2026 Botij0. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
