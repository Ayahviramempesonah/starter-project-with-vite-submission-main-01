import routes from '../routes/routes';
import { getActiveRoute, getActivePathname } from '../routes/url-parser';

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this.#setupDrawer();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener('click', () => {
      this.#navigationDrawer.classList.toggle('open');
    });

    document.body.addEventListener('click', (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove('open');
      }

      this.#navigationDrawer.querySelectorAll('a').forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove('open');
        }
      });
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const route = routes[url];
    // get page
    const page = route();

    this.#content.innerHTML = await page.render();
    await page.afterRender();
  }

  // perbaikan renderPage
  // async renderPage() {
  //   try {
  //     // Dapatkan path aktif
  //     const activePathname = getActivePathname();

  //     // Dapatkan route yang cocok dengan path aktif
  //     const routeKey = getActiveRoute(activePathname, routes);
  //     const Page = routes[routeKey];

  //     if (!Page) {
  //       throw new Error(`No route found for path: '${activePathname}'`);
  //     }

  //     // Buat instance halaman
  //     const pageInstance = new Page();

  //     // Render halaman
  //     this.#content.innerHTML = await pageInstance.render();
  //     await pageInstance.afterRender();
  //   } catch (error) {
  //     console.error('Error rendering page:', error.message);
  //     this.#content.innerHTML = `<p style="color: red;">${error.message}</p>`;
  //   }
  //   console.log('Active route key:', routeKey);

  // }
}

export default App;
