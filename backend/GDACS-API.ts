export const fetchRisksGDACS = async () => {
    const response = await fetch('https://gdacs.org/xml/rss.xml');
    const data = await response.text();

    return data
}
