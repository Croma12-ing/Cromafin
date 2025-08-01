import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const Delete_Account = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Account Deleted
          </h1>
          <p className="text-muted-foreground text-lg">
            Your account has been deleted. Thank you for using this app.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Delete_Account;