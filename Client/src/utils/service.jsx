export const baseUrl = "https://task-management-api-rust.vercel.app/api";

export const postRequest = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await response.json();

    if (!response.ok) {
      let message;

      if (data?.message) {
        message = data.message;
      } else {
        message = data;
      }

      return { error: true, status: response.status, message };
    }

    return data;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getRequest = async (url) => {
  try {
    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
      let message;

      if (data?.message) {
        message = data.message;
      } else {
        message = data;
      }

      return { error: true, status: response.status, message };
    }

    return data;
  } catch (error) {
    return { error: true, message: error.message };
  }
};
