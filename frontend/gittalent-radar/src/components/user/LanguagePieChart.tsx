import { 
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer
 } from "recharts";

 type Props = {
    data: {
        name: string;
        percentage: number;
    }[];
 };

 export default function LanguagePieChart({data,}: Props) {
    return(
        <div className="h-[350px]">
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="percentage"
                        nameKey="name"
                    />

                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
 }