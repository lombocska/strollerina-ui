"use client";

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/table";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";


export const InfoTable = ({ columns, json }) => {
    const { t, lang } = useTranslation('strollers');

    var rows = [json];

    // useEffect(() => {
    //     rows.push(json);
    // }, []); 


    return (
        <Table aria-label="Example table with dynamic content" className="isCompact break-words text-wrap pb-5" layout="fixed" removeWrapper>
            <TableHeader columns={columns} className="line-clamp-3 break-words text-wrap">
                {(column) => <TableColumn key={column.key} className="text-wrap break-words">{t(column.label)}</TableColumn>}
            </TableHeader>
            <TableBody items={rows}>
                {(item) => (
                <TableRow key={item.key}>
                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                </TableRow>
                )}
            </TableBody>
        </Table>
        // <Table aria-label="Example table with dynamic content">
        //   <TableHeader>
        //     {columns?.map((column) =>
        //       <TableColumn key={column.key}>{column.label}</TableColumn>
        //     )}
        //   </TableHeader>
        //   <TableBody emptyContent={"No rows to display."}>
        //     {rows.map((row) =>
        //       <TableRow key={row.key}>
        //         {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
        //       </TableRow>
        //     )}
        //   </TableBody>
        // </Table>
        );
};
