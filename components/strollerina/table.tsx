"use client";

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/table";


export const InfoTable = ({ columns, json, dictionary}) => {

    var rows = [json];

    return (
        <Table aria-label="Example table with dynamic content" className="isCompact break-words text-wrap pb-5" layout="fixed" removeWrapper>
            <TableHeader columns={columns} className="line-clamp-3 break-words text-wrap">
                {(column) => <TableColumn key={column.key} className="text-wrap break-words">{dictionary[column.label]}</TableColumn>}
            </TableHeader>
            <TableBody items={rows}>
                {(item) => (
                <TableRow key={item.key}>
                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                </TableRow>
                )}
            </TableBody>
        </Table>
        );
};
