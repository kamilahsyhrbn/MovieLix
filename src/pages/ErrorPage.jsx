import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center py-12 text-white">
      <h1 className="text-3xl text-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to={-1}>
        <button className="p-2 text-white bg-[#FF5BAE] rounded-lg mt-3 hover:bg-[#bea650]">
          Go back
        </button>
      </Link>
    </div>
  );
}
