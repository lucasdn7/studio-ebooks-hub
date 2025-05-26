
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                <span className="text-gray-900 font-bold text-sm">SA</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Studio Ebooks</h3>
                <p className="text-sm text-gray-400">Arquitetura & Design</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Plataforma especializada em e-books premium para profissionais de arquitetura, 
              design de interiores e marcenaria.
            </p>
            <p className="text-sm text-gray-400">
              © 2024 Studio Ebooks. Todos os direitos reservados.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">E-books</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Categorias</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Assinatura</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
