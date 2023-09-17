export const createUser = async (userData) => {
  console.log("about the create a user");
  console.log(userData);

  try {
    const response = await fetch(
      "https://onesignal.com/api/v1/apps/edad183c-31b0-4db4-82e8-348e4b67bf6a/users",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          properties: {
            tags: { username: userData.username },
            language: "en",
          },
          identity: { external_id: userData.email },
        }),
      }
    );

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

export const createNotification = async () => {
  const app_id = "edad183c-31b0-4db4-82e8-348e4b67bf6a";
  const api_key = "MWJkOWM1NjQtY2ExZC00NDY0LTk3NTAtYWYzMGE0YzM0MTE2";

  const URL = "https://onesignal.com/api/v1/notifications";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Basic ${api_key}`,
  };

  const method = "POST";

  const body = JSON.stringify({
    //included_segments: ["Active Subscriptions"],
    //include_subscription_ids: ["511b8591-2672-4d56-bea8-96537db3003e"],
    contents: { en: "English or Any Language Message", es: "Spanish Message" },
    name: "INTERNAL_CAMPAIGN_NAME",
    app_id: app_id,
  });

  try {
    const response = await fetch(URL, {
      method: method,
      headers: headers,
      body: body,
    });

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
