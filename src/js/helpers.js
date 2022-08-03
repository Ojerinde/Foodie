// import { async } from 'regenerator-runtime';s
import { TIMEOUT__SEC } from './config.js';

// Reusable functions
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT__SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err; // This will make sure that if there is an error, the fulfilled value will be rejected: propagate down
  }
};
/*
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT__SEC)]);
  const data = await res.json();
  if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  return data;
  } catch (err) {
    throw err; // This will make sure that if there is an error, the fulfilled value will be rejected: propagate down
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    // To send a data, we need to pass in an object to the the fetch promise
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', //The data to be sent is in the json format.
      },
      body: JSON.stringify(uploadData), // The data to be sent
    })
    const res = await Promise.race([fetchPro, timeout(TIMEOUT__SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err; // This will make sure that if there is an error, the fulfilled value will be rejected: propagate down
  }
};
*/
