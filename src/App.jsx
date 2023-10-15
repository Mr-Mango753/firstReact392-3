import React from 'react';
import Banner from './components/Banner/Banner.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import Terms from './components/Terms.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dispatcher from './components/CourseList/Dispatcher.jsx';

const FetchData = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  
  if (error) return <span>error loading data</span>;
  if (isLoading) return <span>loading data</span>;
  if (!data) return <span>no data found</span>;

  return (
    <>
      <Terms courses={Object.values(data.courses)} />
      <Dispatcher data={data} />  
    </>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <div>
        <Banner />
        <FetchData />
      </div>
    </QueryClientProvider>
    <div id="bottom"> </div>
  </BrowserRouter>  
);

export default App;
