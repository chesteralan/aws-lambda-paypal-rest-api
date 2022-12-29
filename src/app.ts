import { Handler, Context } from 'aws-lambda';
import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config();

const baseUrl:string = process.env.PAYPAL_API_URL as string;

export const handler:Handler = async (event: any, context: Context): Promise<any> => {

  const apiUrl:string = `${baseUrl}/v1/oauth2/token`;

  const config:any = {
    headers: {
      "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`,
      "Content-Type": `application/json`
    }
  };
  
  const data:any = {
  }

  //return new Promise<any>((resolve) => resolve({event,context}))
  return await axios.post(apiUrl,JSON.stringify(data),config).then(response => {
    return response.data;
  });
}

export const authHandler:Handler = async (event: any, context: Context): Promise<any> => {

  const apiUrl:string = `${baseUrl}/v1/oauth2/token`;

  const config:any = {
    headers: {
      "Content-Type": `application/x-www-form-urlencoded`
    },
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_CLIENT_SECRET
    }
  };
  
  const data = new URLSearchParams({
    'grant_type': 'client_credentials'
  })

  //return new Promise<any>((resolve) => resolve({event,context}))
  return await axios.post(apiUrl,data,config).then(response => {
    console.log(response.data?.access_token);
    return response.data;
  });
}