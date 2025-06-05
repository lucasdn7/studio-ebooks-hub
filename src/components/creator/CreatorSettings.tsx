
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Settings, User, CreditCard, Globe } from "lucide-react";
import { useCreator } from "@/hooks/useCreator";

const CreatorSettings = () => {
  const { creatorProfile, updateProfile } = useCreator();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    bio: '',
    email: '',
    website: '',
    social_facebook: '',
    social_instagram: '',
    social_twitter: '',
    bank_account: '',
    bank_agency: '',
    bank_name: '',
    pix_key: ''
  });

  useEffect(() => {
    if (creatorProfile) {
      const socialLinks = creatorProfile.social_links as any || {};
      const bankDetails = creatorProfile.bank_details as any || {};
      
      setProfileData({
        bio: creatorProfile.bio || '',
        email: '',
        website: socialLinks.website || '',
        social_facebook: socialLinks.facebook || '',
        social_instagram: socialLinks.instagram || '',
        social_twitter: socialLinks.twitter || '',
        bank_account: bankDetails.account || '',
        bank_agency: bankDetails.agency || '',
        bank_name: bankDetails.bank_name || '',
        pix_key: bankDetails.pix_key || ''
      });
    }
  }, [creatorProfile]);

  const handleSaveProfile = async () => {
    setLoading(true);
    
    const social_links = {
      website: profileData.website,
      facebook: profileData.social_facebook,
      instagram: profileData.social_instagram,
      twitter: profileData.social_twitter
    };

    const bank_details = {
      account: profileData.bank_account,
      agency: profileData.bank_agency,
      bank_name: profileData.bank_name,
      pix_key: profileData.pix_key
    };

    await updateProfile({
      bio: profileData.bio,
      social_links,
      bank_details
    });

    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light text-gray-900">Configurações da Conta</h2>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Informações do Perfil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="bio">Biografia</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              placeholder="Conte um pouco sobre você e sua experiência..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Redes Sociais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={profileData.website}
              onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
              placeholder="https://seusite.com"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                value={profileData.social_facebook}
                onChange={(e) => setProfileData({ ...profileData, social_facebook: e.target.value })}
                placeholder="facebook.com/seuperfil"
              />
            </div>
            
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={profileData.social_instagram}
                onChange={(e) => setProfileData({ ...profileData, social_instagram: e.target.value })}
                placeholder="@seuusuario"
              />
            </div>
            
            <div>
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                value={profileData.social_twitter}
                onChange={(e) => setProfileData({ ...profileData, social_twitter: e.target.value })}
                placeholder="@seuusuario"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Banking Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Dados Bancários
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bank_name">Banco</Label>
              <Input
                id="bank_name"
                value={profileData.bank_name}
                onChange={(e) => setProfileData({ ...profileData, bank_name: e.target.value })}
                placeholder="Nome do banco"
              />
            </div>
            
            <div>
              <Label htmlFor="bank_agency">Agência</Label>
              <Input
                id="bank_agency"
                value={profileData.bank_agency}
                onChange={(e) => setProfileData({ ...profileData, bank_agency: e.target.value })}
                placeholder="0000"
              />
            </div>
            
            <div>
              <Label htmlFor="bank_account">Conta</Label>
              <Input
                id="bank_account"
                value={profileData.bank_account}
                onChange={(e) => setProfileData({ ...profileData, bank_account: e.target.value })}
                placeholder="00000-0"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="pix_key">Chave PIX</Label>
            <Input
              id="pix_key"
              value={profileData.pix_key}
              onChange={(e) => setProfileData({ ...profileData, pix_key: e.target.value })}
              placeholder="CPF, e-mail, telefone ou chave aleatória"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveProfile} disabled={loading}>
          {loading ? "Salvando..." : "Salvar Configurações"}
        </Button>
      </div>
    </div>
  );
};

export default CreatorSettings;
