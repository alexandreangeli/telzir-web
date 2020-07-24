import React, { useState, useEffect, useContext } from "react";
import MaterialTable, { Column } from "material-table";
import { ICallPrice } from "../../models/CallPrice";
import { getPropertyName, centsToReal } from "../../services/Utils";
import {
  getCallPricesAPI,
  addCallPriceAPI,
  updateCallPriceAPI,
  removeCallPriceAPI,
} from "../../requests/callPrices";
import "./styles.css";
import { WindowSizeContext } from "../../contexts/WindowSizeContext";

export default function Home() {
  const windowSizeContextValue = useContext(WindowSizeContext);
  const [callPrices, setCallPrices] = useState<ICallPrice[]>([]);
  const columns: Column<ICallPrice>[] = [
    {
      title: "Origem",
      field: getPropertyName((callPrice: ICallPrice) => callPrice.origin),
      render: (rowData) => rowData.origin,
      validate: (rowData) => {
        return {
          isValid:
            /^[0-9]{3}$/.test(rowData.origin) &&
            !thereIsCallPriceWithSameOriginAndDestination(
              rowData.origin,
              rowData.destination,
              rowData.id
            ),
          helperText: !/^[0-9]{3}$/.test(rowData.origin)
            ? "Campo númerico de 3 dígitos"
            : thereIsCallPriceWithSameOriginAndDestination(
                rowData.origin,
                rowData.destination,
                rowData.id
              )
            ? "Existe registro com mesma origem e destino"
            : "",
        };
      },
    },
    {
      title: "Destino",
      field: getPropertyName((callPrice: ICallPrice) => callPrice.destination),
      render: (rowData) => rowData.destination,
      validate: (rowData) => {
        return {
          isValid:
            /^[0-9]{3}$/.test(rowData.destination) &&
            !thereIsCallPriceWithSameOriginAndDestination(
              rowData.origin,
              rowData.destination,
              rowData.id
            ),
          helperText: !/^[0-9]{3}$/.test(rowData.destination)
            ? "Campo númerico de 3 dígitos"
            : thereIsCallPriceWithSameOriginAndDestination(
                rowData.origin,
                rowData.destination,
                rowData.id
              )
            ? "Existe registro com mesma origem e destino"
            : "",
        };
      },
    },
    {
      title: "R$/Min",
      field: getPropertyName(
        (callPrice: ICallPrice) => callPrice.cents_per_minute
      ),
      render: (rowData) => centsToReal(rowData.cents_per_minute),
      validate: (rowData) => {
        return {
          isValid: /^[0-9]+$/.test(rowData.cents_per_minute?.toString()),
          helperText: !/^[0-9]+$/.test(rowData.cents_per_minute?.toString())
            ? "Campo numérico obrigatório"
            : "Valor em centavos",
        };
      },
      customFilterAndSearch: (
        filter: any,
        rowData: ICallPrice,
        columnDef: Column<ICallPrice>
      ) => centsToReal(rowData.cents_per_minute).includes(filter),
    },
  ];

  useEffect(() => {
    getCallPrices();
  }, []);

  function getCallPrices() {
    getCallPricesAPI().then((r) => {
      setCallPrices(r.data);
    });
  }

  function thereIsCallPriceWithSameOriginAndDestination(
    origin: string,
    destination: string,
    id: number
  ) {
    return !!callPrices.find(
      (callPrice) =>
        callPrice.origin === origin &&
        callPrice.destination === destination &&
        callPrice.id !== id
    );
  }

  return (
    <div className="default-page home-page">
      <MaterialTable
        style={{
          backgroundColor: "var(--c-4)",
          color: "var(--c-3)",
          border: "1px solid var(--c-3)",
        }}
        title={
          windowSizeContextValue.width >= 800
            ? "Telzir - Tabela de preços de ligações"
            : "Telzir"
        }
        columns={columns}
        data={callPrices}
        options={{
          headerStyle: {
            backgroundColor: "var(--c-4)",
            color: "var(--c-3)",
            border: "1px solid var(--c-3)",
          },
          maxBodyHeight: "75vh",
          paging: false,
          sorting: true,
        }}
        editable={{
          onRowAdd: (newData) =>
            addCallPriceAPI(newData).then(() => getCallPrices()),
          onRowUpdate: (newData, oldData) =>
            updateCallPriceAPI(newData).then(() => getCallPrices()),
          onRowDelete: (oldData) =>
            removeCallPriceAPI(oldData).then(() => getCallPrices()),
        }}
        localization={{
          body: {
            emptyDataSourceMessage: "Nenhum registro para exibir",
            addTooltip: "Adicionar",
            deleteTooltip: "Excluir",
            editTooltip: "Editar",
            filterRow: {
              filterTooltip: "Filtro",
            },
            editRow: {
              deleteText: "Tem certeza que deseja excluir esse registro?",
              cancelTooltip: "Cancelar",
              saveTooltip: "Confirmar",
            },
          },
          header: {
            actions: "Ações",
          },
          toolbar: {
            searchTooltip: "Pesquisar",
            searchPlaceholder: "Pesquisar",
          },
        }}
      />
    </div>
  );
}
