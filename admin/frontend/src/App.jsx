import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import DashboardHome from './components/DashboardHome'
import ProductList from './components/ProductList'
import AddProductForm from './components/AddProductForm'
import EditProductForm from './components/EditProductForm'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingProduct, setEditingProduct] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'products':
        return <ProductList setActiveTab={setActiveTab} setEditingProduct={setEditingProduct} />;
      case 'add-product':
        return <AddProductForm />;
      case 'edit-product':
        return (
          <EditProductForm
            product={editingProduct}
            onCancel={() => {
              setEditingProduct(null);
              setActiveTab('products');
            }}
            onSuccess={() => {
              setEditingProduct(null);
              setActiveTab('products');
            }}
          />
        );
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
      {/* Sidebar - Fixed Width */}
      <div className="w-72 flex-shrink-0 border-r border-slate-200 bg-white h-full">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content - Flex Grow & Scrollable */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden custom-scrollbar p-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

export default App
