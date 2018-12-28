import React from "react";
import {getById} from "../../utils";
import DataFetcher from "./DataFetcher";

const RenderPropApproach = ({ data, isLoading, error, match }) => (
  <DataFetcher url={match.params.id} method={getById}>
    {({ data, isLoading, error }) => {
      if (!data) {
        return <p>No data yet ...</p>;
      }

      if (error) {
        return <p>{error.message}</p>;
      }

      if (isLoading) {
        return <p>Loading ...</p>;
      }

      if (data && data.message) {
        const { release, stars, title, format } = data.message;
        return (
          <div>
            {`${title} (${release}) ${format}`}
            <p>
              stars:
              {stars.length > 0 && stars.map(i => <span>{i} </span>)}
            </p>
          </div>
        );
      }

      return <p>unfortunately, no data, something happened</p>;
    }}
  </DataFetcher>
);

export default  RenderPropApproach;