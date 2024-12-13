const API_URL = "https://mero.finance/api/apys";

// Temporary Polygon constants
const POLYGON_API_URL = "https://www.convexfinance.com/api/curve-polygon-apys";
const POLYGON_USDC_POOL_ID = "polygon-0xa138341185a9d0429b0021a11fb717b225e13e1f-11";
const POLYGON_USDC_POOL = "0x3d1004B2856b9d35228ec28f8F152FE9f9e51f81";

export interface Apy {
  pool: string;
  apy: number;
}

export async function getApys(): Promise<Apy[]> {
  const [mainnetApys, polygonApys] = await Promise.all([getMainnetApys(), getPolygonApys()]);
  return [...mainnetApys, ...polygonApys];
}

export async function getMainnetApys(): Promise<Apy[]> {
  return (await fetch(API_URL)).json();
}

// This is temporary while the pool is new and volatile
// We will switch to the same APY system as the other pools once it stabilizes
export async function getPolygonApys(): Promise<Apy[]> {
  return [];
  const response = await fetch(POLYGON_API_URL);
  const data = await response.json();
  const aprData = data.apys[POLYGON_USDC_POOL_ID];
  const apr = aprData.baseApy + aprData.crvApy;
  const apy = ((1 + apr / 100 / 52) ** 52 - 1) * 100;
  return [
    {
      pool: POLYGON_USDC_POOL,
      apy,
    },
  ];
}
