import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

type Props = {
    login: string
    avatarUrl: string
}
export default function GitHubUserCard({login, avatarUrl}: Props){
    return (
        <Link to={`/users/${login}`}>
            <Card className="w-72 cursor-pointer hover:shadow-lg transition bg-white text-black">
                <CardContent className="flex flex-col items-center p-6">
                    <img 
                        src={avatarUrl}
                        alt={login}
                        className="h-24 w-24 rounded-full"/>
                    <h2 className="mt-4 font-semibold text-foreground text-lg">
                        {login}
                    </h2>
                </CardContent>
            </Card>
        </Link>
        
    )
}