import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import { useInfiniteQuery } from "react-query";
import React from "react";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query

  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined
    }
  )

  if(isLoading) return <div className="loading"></div>

  if(isError) return <div>Error! {error.toString()}</div>
  
  return (
    <React.Fragment>
    {isFetching && <div className="loading">Loading....</div>}
    <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage} >
      {data.pages.map((pageData) => {
        return pageData.results.map((person) => {
          return <Person 
            key={person.name} 
            name={person.name} 
            hairColor={person.hair_color} 
            eyeColor={person.eye_color}
            />
        })
      })}
    </InfiniteScroll>
    </React.Fragment>
    
  )
}
