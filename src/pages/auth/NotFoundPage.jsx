import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-2xl font-semibold text-indigo-600">404</p>
        <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="outline outline-sky-300 px-[20px] py-[10px] rounded-[12px] hover:bg-sky-400 transition duration-200 "
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
