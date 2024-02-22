import * as React from "react";
import { useState, useEffect } from "react";
import { getData, getVersionHistory } from "../service/spservice";
import { Table, Button } from "antd";
import styles from "./VersionHistory.module.scss";
import type { IVersionHistoryProps } from "./IVersionHistoryProps";

const VersionHistory: React.FC<IVersionHistoryProps> = (props) => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [versionHistory, setVersionHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const requestDetails: any[] = await getData();
      setItems(requestDetails);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchVersionHistory = async (itemId: number) => {
    try {
      const history: any = await getVersionHistory(itemId);
      setVersionHistory(history);
      console.log(history);
    } catch (error) {
      console.error("Error fetching version history:", error);
    }
  };

  const columns = [
    {
      title: "Version No",
      dataIndex: "VersionLabel",
      key: "VersionLabel",
    },
    {
      title: "Modified Date",
      dataIndex: "Modified",
      key: "Modified",
      render: (text: string) => text.substr(0, 10),
    },
    {
      title: "Modified Time",
      dataIndex: "Modified",
      key: "Modified",
      render: (text: string) => text.substr(11, 8),
    },
    {
      title: "Modified By",
      dataIndex: "Editor",
      key: "Editor",
      render: (editor: any) => editor.LookupValue,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Files Versioning</div>
      <Table dataSource={items} pagination={{ pageSize: 4 }}>
        <Table.Column title="Item ID" dataIndex="Id" key="Id" />
        <Table.Column
          title="Version History"
          key="action"
          render={(text: any, record: any) => (
            <Button
              type="link"
              onClick={() => {
                setSelectedItemId(record.Id);
                fetchVersionHistory(record.Id);
              }}
              className={styles.versionBtn}
            >
              Show Version History
            </Button>
          )}
        />
      </Table>
      {selectedItemId && (
        <div>
          <h3>Version History for Item ID: {selectedItemId}</h3>
          {versionHistory.length > 0 ? (
            <Table columns={columns} dataSource={versionHistory} />
          ) : (
            <p>No version history available for this item.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VersionHistory;
