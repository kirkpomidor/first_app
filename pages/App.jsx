import { Badge, Card, Table, useAsyncList, useCollator, Text, Grid, Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

// const server_address = "http://192.168.1.68:3000/"; // home
// const server_address = "http://192.168.0.130:3000/"; // work
const server_address = "http://localhost:3000/"; // local
// const server_address = "http://localhost:3000/"; // cafe
// const server_address = "http://100.101.160.155";

export default function App() {
    const collator = useCollator({ numeric: true });
    async function load({ signal }) {
        const res = await fetch(server_address + "data/MEDANCO_zjd34jh78gl", {
            signal,
        });
        const json = await res.json();
        console.log(json);
        return {
            items: json,
        };
    }
    async function sort({ items, sortDescriptor }) {
        return {
            items: items.sort((a, b) => {
                let first = a[sortDescriptor.column];
                let second = b[sortDescriptor.column];
                let cmp = collator.compare(first, second);
                if (sortDescriptor.direction === "descending") {
                    cmp *= -1;
                }
                return cmp;
            }),
        };
    }
    const list = useAsyncList({ load, sort });
    return (
        // <Card>
        <Table
            striped
            sticked
            aria-label="DCbase"
            css={{ minWidth: "100%", height: "auto" }}
            selectionMode="single"
            sortDescriptor={list.sortDescriptor}
            onSortChange={list.sort}
            defaultSelectedKeys={["6461fa6441a0fc1666abb36c"]}
        >
            <Table.Header>
                {/* filled_date	html	filled_data	filled_user	status	filling_type */}
                <Table.Column key="DC_id" allowsSorting>
                    Номер ДС
                </Table.Column>
                <Table.Column key="inn_actor" allowsSorting>
                    ИНН Покупателя
                </Table.Column>
                <Table.Column key="actor" allowsSorting>
                    Покупатель
                </Table.Column>
                <Table.Column key="responsible" allowsSorting>
                    Ответственный
                </Table.Column>
                <Table.Column key="created_date" allowsSorting>
                    Дата создания
                </Table.Column>
                <Table.Column key="filled_date" allowsSorting>
                    Дата заполнения
                </Table.Column>
                <Table.Column key="filled_user" allowsSorting>
                    Заполнил
                </Table.Column>
                <Table.Column key="status" allowsSorting>
                    Статус
                </Table.Column>
                <Table.Column key="name" allowsSorting>
                    Ссылка
                </Table.Column>
            </Table.Header>

            <Table.Body items={list.items} loadingState={list.loadingState}>
                {(item) => (
                    <Table.Row key={item._id}
                    >
                        {(columnKey) =>
                            columnKey == "name" ? (
                                <Table.Cell>
                                    <Link
                                        href={`${server_address}download_link/${item["_id"]}`}
                                    >
                                        Ссылка
                                    </Link>
                                </Table.Cell>
                            ) : columnKey == "actor" ?
                            <Table.Cell><b>{item[columnKey]}</b></Table.Cell>
                            : columnKey == "status" ?
                            (
                                <Table.Cell>
                                            {(() => {
                                                let color, text;
                                                switch (item[columnKey]) {
                                                case "active":
                                                    color = "warning";
                                                    text = "Активен";
                                                    break;
                                                case "loaded":
                                                    color = "success";
                                                    text = "Согласован";
                                                    break;
                                                default:
                                                    color = "default";
                                                    text = "Отменен";
                                                    break;
                                                }
                                                return (
                                                <Badge enableShadow disableOutline color={color}>
                                                    {text}
                                                </Badge>
                                                );
                                            })()}
                                        
                                </Table.Cell>
                            )
                            :(
                                // <Table.Cell>{item[columnKey]}</Table.Cell>
                                <Table.Cell>{item[columnKey]}</Table.Cell>
                            )
                        }
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
        // </Card>
    );
}
