const link = "http://api.weatherstack.com/current?access_key=a923fb5a3f626866873abb3056805467";

const fetchData = async () => {
    const result = await fetch('${link}&query=London');
    const data = await result.json();

    console.log(data);
};
fetchData();