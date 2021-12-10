import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";

interface PriceProps {
  coinId: string;
}

const PriceView = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const PriceViewItem = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  height: 50px;

  span: first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin: 5px 0px;
  }
`;

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery(
    ["price", coinId],
    () => fetchCoinTickers(coinId),
    {
      // refetchInterval: 10000,
    }
  );
  console.log(data);

  return (
    <div>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <>
          <h1>Price</h1>
          <PriceView>
            <PriceViewItem>
              <span>ATH-PRICE</span>
              <span>${data?.quotes.USD.ath_price.toFixed(2)}</span>
            </PriceViewItem>
            <PriceViewItem>
              <span>NOW-PRICE</span>
              <span>${data?.quotes.USD.price.toFixed(2)}</span>
            </PriceViewItem>
          </PriceView>
        </>
      )}
    </div>
  );
}

export default Price;
