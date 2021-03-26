import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { useTransactions } from "../../hooks/useTransaction";
import { formatNumberToCurrencyBRL } from "../../utils/formatNumberToCurrencyBRL";

import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "deposit") {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraw += transaction.amount;
        acc.total -= transaction.amount;
      }
      return acc;
    },
    { deposits: 0, withdraw: 0, total: 0 }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entrada</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{formatNumberToCurrencyBRL(summary.deposits)}</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>{`- ${formatNumberToCurrencyBRL(summary.withdraw)}`}</strong>
      </div>
      <div
        className={`highlight-background-${
          summary.total < 0 ? "negative" : "positive"
        }`}
      >
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>{formatNumberToCurrencyBRL(summary.total)}</strong>
      </div>
    </Container>
  );
}
