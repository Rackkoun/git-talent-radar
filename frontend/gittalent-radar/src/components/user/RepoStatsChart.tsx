import { 
    LineChart, Line, Tooltip,
    ResponsiveContainer,
    XAxis, YAxis
 } from "recharts";

 type Props= {
    data: {
        month: string;
        repos: number;
    }[];
 };

 export default function RepoStatsChart({data, }: Props){
    return (
        <div className="h-[350px]">
            <ResponsiveContainer>
                <LineChart data={data}>
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Line 
                        type="monotone" 
                        dataKey="repos"
                        stroke="#60a5fa"
                        strokeWidth={5}
                        dot={{r: 5}}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
 }