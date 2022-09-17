import dynamic from "next/dynamic";
import { CustomNextPage } from "../../src/types/Page.type";

const TVChartContainer = dynamic(
  // @ts-ignore
  () => import("../../src/components/charts-page/TVChartContainer").then((mod) => mod.TVChartContainer),
  { ssr: false },
);

const Charts: CustomNextPage = () => {
  return (
    <div>
      <TVChartContainer />
    </div>
  );
};

export default Charts;
