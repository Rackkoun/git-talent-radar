import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchBar() {

    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-xl">
            <div className="relative">
                <Search
                    className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
                />

                <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && username.trim()){
                            navigate(`/users/${username}`);
                        }
                    }}
                    placeholder="Search GitHub user..."
                    className="pl-10"
                />
            </div>
        </div>
    )
}