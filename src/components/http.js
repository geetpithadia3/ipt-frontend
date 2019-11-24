import {useState, useEffect} from 'react'
import axios from "axios";

export const useHttpGet = (target,initialData,dependencies) =>{
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedData, setFetchedData] =useState(initialData);
    useEffect(() => {
        setIsLoading(true)
        axios
        .get(target,{"withCredentials":true, "headers":{"Access-Control-Allow-Credentials":true}})
        .then(function(response) {
          setFetchedData(response)
          setIsLoading(false)
        })
        .catch(function(error) {
          console.log(error);
          setIsLoading(false)
        });
        
    }, dependencies)
    // console.log(fetchedData)
    return [isLoading, fetchedData]
}

export const useHttpPost = (target, payload,dependencies) =>{
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] =useState();
  useEffect(() => {
      setIsLoading(true)
      axios
      .post(target, payload)
      .then(function(response) {
        setFetchedData(response)
        setIsLoading(false)
      })
      .catch(function(error) {
        console.log(error);
        setIsLoading(false)
      });
      
  }, dependencies)
  console.log(fetchedData)
  return [isLoading, fetchedData]
}

