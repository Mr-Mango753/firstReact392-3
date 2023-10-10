import React from 'react';
import Banner from './components/Banner/Banner.jsx';
import CourseList from './components/CourseList/CourseList.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import Terms from './components/Terms.jsx'

const FetchData = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  if (error) return <span>error loading data</span>;
  else if (isLoading) return <span>loading data</span>;
  else if (!data) return <span>no data found</span>;
  return (
  <>
    <Banner title={data.title} />
    <Terms courses={Object.values(data.courses)} />
    {/* <CourseList courses={Object.values(data.courses)} /> */}
  </>
  );
}
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div>
      <FetchData />
    </div>
  </QueryClientProvider>
);

export default App;