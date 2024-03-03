import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
}

const API_URL = '/api/data/users?timeout=10000';
const TIMEOUT = 5000;

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);


  useEffect(() => {
    let timer: number;
    timer = setTimeout(() => setIsError(true), TIMEOUT);

    fetchData();

    return () => {
      clearTimeout(timer);
      if (abortController) {
        abortController.abort();
      }
    };
  }, []);

  const fetchData = () => {
    const controller = new AbortController();
    setAbortController(controller);

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(({ users }) => {
        setUsers(users);
        setIsLoading(false);
        setIsError(false);
      })
      .catch(() => {
          setIsLoading(false);
          setIsError(true);
     
      });
  };

  const handleRetry = () => {
    if (abortController) {
      console.log(abortController)
      abortController.abort();
    }
    fetchData();
    setIsLoading(true);
    setIsError(false);
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Users</h1>

        <div className="flex flex-row items-center">
          {isError ? (
            <>
              <p className="mr-2">
                Sorry, there seems to be connectivity issues...
              </p>
              <button
                onClick={handleRetry}
                className="text-blue-400 bg-blue-200 hover:text-blue-200 hover:bg-blue-400 rounded-md p-4"
              >
                Try again
              </button>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
      {isLoading ? (
        <div className="h-[300px] flex items-center justify-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <ul className="space-y-2">
          {users.map((user, index) => (
            <li
              className="bg-white p-4 rounded-md border border-gray-100"
              key={index}
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
