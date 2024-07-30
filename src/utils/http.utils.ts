export const postRequest = async (
  url: string,
  body: any,
  headers: any
): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    switch (response.status) {
      case 401: {
        // Login require
        break;
      }

      case 403: {
        // Permission denied
        break;
      }
      case 404: {
        // Invalid request
        break;
      }
      case 500: {
        // Server error
        break;
      }
      default: {
        // Unknown error occured
        break;
      }
    }

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getRequest = async (
  url: string,
  headers: HeadersInit
): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    switch (response.status) {
      case 401: {
        // Login require
        break;
      }

      case 403: {
        // Permission denied
        break;
      }
      case 404: {
        // Invalid request
        break;
      }
      case 500: {
        // Server error
        break;
      }
      default: {
        // Unknown error occured
        break;
      }
    }

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const putRequest = async (
  url: string,
  body: any,
  headers: any
): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(body),
    });

    switch (response.status) {
      case 401: {
        // Login require
        break;
      }

      case 403: {
        // Permission denied
        break;
      }
      case 404: {
        // Invalid request
        break;
      }
      case 500: {
        // Server error
        break;
      }
      default: {
        // Unknown error occured
        break;
      }
    }

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const deleteRequest = async (
  url: string,
  headers: any
): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: headers,
    });

    switch (response.status) {
      case 401: {
        // Login require
        break;
      }

      case 403: {
        // Permission denied
        break;
      }
      case 404: {
        // Invalid request
        break;
      }
      case 500: {
        // Server error
        break;
      }
      default: {
        // Unknown error occured
        break;
      }
    }

    return response;
  } catch (error: any) {
    throw error;
  }
};
