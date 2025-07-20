import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CampaignDescription = ({ campaign }) => {
  const [activeTab, setActiveTab] = useState('story');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const tabs = [
    { id: 'story', label: 'Story', icon: 'FileText' },
    { id: 'updates', label: 'Updates', icon: 'Clock' },
    { id: 'gallery', label: 'Gallery', icon: 'Image' },
    { id: 'breakdown', label: 'Fund Usage', icon: 'PieChart' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === campaign.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? campaign.gallery.length - 1 : prev - 1
    );
  };

  const renderStoryContent = () => (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <p className="font-body text-foreground leading-relaxed">
          {campaign.description}
        </p>
      </div>

      {/* Beneficiary Info */}
      <div className="bg-muted/50 rounded-card p-6">
        <h4 className="font-heading font-heading-semibold text-lg text-foreground mb-4">
          About the Beneficiary
        </h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Icon name="User" size={18} className="text-muted-foreground" />
            <span className="font-body text-foreground">{campaign.beneficiary}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="MapPin" size={18} className="text-muted-foreground" />
            <span className="font-body text-foreground">{campaign.location}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={18} className="text-muted-foreground" />
            <span className="font-body text-foreground">Campaign started: {campaign.startDate}</span>
          </div>
        </div>
      </div>

      {/* Verification Details */}
      <div className="bg-success/10 rounded-card p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={24} className="text-success mt-1" />
          <div>
            <h4 className="font-heading font-heading-semibold text-lg text-success mb-2">
              Verified Campaign
            </h4>
            <p className="font-body text-success/80 mb-3">
              This campaign has been verified by our team and meets all our authenticity standards.
            </p>
            <ul className="space-y-2">
              {campaign.verificationDetails.map((detail, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span className="font-caption text-success">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUpdatesContent = () => (
    <div className="space-y-6">
      {campaign.updates.map((update, index) => (
        <div key={index} className="border-l-4 border-primary pl-6 pb-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-3 h-3 bg-primary rounded-full -ml-8 border-4 border-background" />
            <span className="font-caption text-muted-foreground">{update.date}</span>
          </div>
          <h4 className="font-heading font-heading-semibold text-lg text-foreground mb-2">
            {update.title}
          </h4>
          <p className="font-body text-muted-foreground mb-3">
            {update.content}
          </p>
          {update.image && (
            <div className="w-full h-48 overflow-hidden rounded-card">
              <Image
                src={update.image}
                alt={update.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderGalleryContent = () => (
    <div className="space-y-6">
      {/* Main Image Display */}
      <div className="relative w-full h-80 overflow-hidden rounded-card">
        <Image
          src={campaign.gallery[currentImageIndex]}
          alt={`Gallery image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-gentle"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-gentle"
        >
          <Icon name="ChevronRight" size={20} />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {campaign.gallery.length}
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
        {campaign.gallery.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`relative w-full h-20 overflow-hidden rounded-card border-2 transition-gentle ${
              currentImageIndex === index
                ? 'border-primary' :'border-transparent hover:border-primary/50'
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );

  const renderBreakdownContent = () => (
    <div className="space-y-6">
      <div className="bg-muted/50 rounded-card p-6">
        <h4 className="font-heading font-heading-semibold text-lg text-foreground mb-4">
          How Your Donation Will Be Used
        </h4>
        <div className="space-y-4">
          {campaign.fundBreakdown.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${item.color}`} />
                <span className="font-body text-foreground">{item.category}</span>
              </div>
              <div className="text-right">
                <div className="font-data font-data-medium text-foreground">
                  {item.percentage}%
                </div>
                <div className="font-caption text-muted-foreground">
                  ₹{item.amount.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transparency Note */}
      <div className="bg-primary/10 rounded-card p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Eye" size={24} className="text-primary mt-1" />
          <div>
            <h4 className="font-heading font-heading-semibold text-lg text-primary mb-2">
              100% Transparency
            </h4>
            <p className="font-body text-primary/80">
              We provide complete transparency on how funds are utilized. Regular updates and receipts are shared with all donors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'story':
        return renderStoryContent();
      case 'updates':
        return renderUpdatesContent();
      case 'gallery':
        return renderGalleryContent();
      case 'breakdown':
        return renderBreakdownContent();
      default:
        return renderStoryContent();
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 pb-4 border-b-2 transition-gentle whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab.icon} size={18} />
              <span className="font-body font-body-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {renderContent()}
      </div>
    </div>
  );
};

export default CampaignDescription;