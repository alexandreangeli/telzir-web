import React, { useState, useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import { ICallPrice } from "../models/CallPrice";
import { getPropertyName, centsToReal } from "../services/Utils";
import {
  getCallPricesAPI,
  addCallPriceAPI,
  updateCallPriceAPI,
  removeCallPriceAPI,
} from "../requests/callPrices";

export default function Home() {
  const [callPrices, setCallPrices] = useState<ICallPrice[]>([]);
  const columns: Column<ICallPrice>[] = [
    {
      title: "Origem",
      field: getPropertyName((callPrice: ICallPrice) => callPrice.origin),
      render: (rowData) => rowData.origin,
      validate: (rowData) => {
        return {
          isValid: rowData.origin?.length == 3,
          helperText:
            rowData.origin?.length != 3 ? "Origem deve ter 3 dígitos" : "",
        };
      },
    },
    {
      title: "Destino",
      field: getPropertyName((callPrice: ICallPrice) => callPrice.destination),
      render: (rowData) => rowData.destination,
      validate: (rowData) => {
        return {
          isValid: rowData.destination?.length == 3,
          helperText:
            rowData.destination?.length != 3
              ? "Destino deve ter 3 dígitos"
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
          isValid: !!rowData.cents_per_minute,
          helperText: !rowData.cents_per_minute
            ? "Campo obrigatório"
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

  return (
    <MaterialTable
      title="Tabela de preços / Ligações Telzir"
      columns={columns}
      data={callPrices}
      options={{
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
          deleteTooltip: "Deletar",
          editTooltip: "Editar",
          filterRow: {
            filterTooltip: "Filtro",
          },
          editRow: {
            deleteText: "Tem certeza que deseja deletar esse registro?",
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
  );
}
