
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Calendar, 
  Crown,
  Check,
  AlertTriangle,
  Receipt
} from "lucide-react";

const SubscriptionManagement = () => {
  const subscriptionData = {
    status: "active",
    plan: "Premium Plus",
    nextBilling: "15/02/2024",
    price: "R$ 29,90",
    paymentMethod: "**** **** **** 1234"
  };

  const paymentHistory = [
    { date: "15/01/2024", amount: "R$ 29,90", status: "Pago", method: "Cartão ****1234" },
    { date: "15/12/2023", amount: "R$ 29,90", status: "Pago", method: "Cartão ****1234" },
    { date: "15/11/2023", amount: "R$ 29,90", status: "Pago", method: "Cartão ****1234" },
    { date: "15/10/2023", amount: "R$ 29,90", status: "Pago", method: "Cartão ****1234" }
  ];

  const benefits = [
    "Acesso ilimitado a todos os eBooks",
    "Downloads offline sem limite",
    "Novos títulos mensais exclusivos",
    "Suporte prioritário",
    "Cancelamento a qualquer momento"
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light text-gray-900">
        Gerenciar <span className="font-medium">Assinatura</span>
      </h2>

      {/* Status Card */}
      <Card className={`border-l-4 ${subscriptionData.status === 'active' ? 'border-l-green-500' : 'border-l-red-500'}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Crown className="w-8 h-8 text-yellow-600" />
              <div>
                <h3 className="text-xl font-medium text-gray-900">{subscriptionData.plan}</h3>
                <Badge className={subscriptionData.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                  {subscriptionData.status === 'active' ? 'Ativa' : 'Expirada'}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-light text-gray-900">{subscriptionData.price}</div>
              <div className="text-sm text-gray-600">por mês</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Próximo pagamento: {subscriptionData.nextBilling}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Método: {subscriptionData.paymentMethod}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button className="bg-gray-900 hover:bg-gray-800">
              Renovar assinatura
            </Button>
            <Button variant="outline">
              Alterar plano
            </Button>
            <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
              Cancelar assinatura
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Check className="w-5 h-5 mr-2 text-green-600" />
              Benefícios inclusos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Receipt className="w-5 h-5 mr-2 text-gray-600" />
              Histórico de pagamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentHistory.map((payment, index) => (
                <div key={index} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{payment.amount}</div>
                    <div className="text-xs text-gray-500">{payment.date} • {payment.method}</div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 text-xs">
                    {payment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Seus dados estão seguros conosco</h4>
              <p className="text-sm text-blue-700 mt-1">
                Protegemos suas informações de pagamento com criptografia de nível bancário e seguimos rigorosamente a LGPD.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionManagement;
