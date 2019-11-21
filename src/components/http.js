import {useState, useEffect} from 'react'
import axios from "axios";

export const useHttpGet = (target,dependencies) =>{
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedData, setFetchedData] =useState();
    const apiBaseUrl = "http://localhost:5000/api"
    useEffect(() => {
        setIsLoading(true)
        axios
        .get(apiBaseUrl+target)
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
  const apiBaseUrl = "http://localhost:5000/api"
  useEffect(() => {
      setIsLoading(true)
      axios
      .post(apiBaseUrl+target, payload)
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

