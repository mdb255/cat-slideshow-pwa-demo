import { IonCard, IonCardContent, IonIcon } from '@ionic/react'
import { chevronForward } from 'ionicons/icons'
import type { Slideshow } from '../../rtk/slideshows/slideshow-model'

interface SlideshowCardProps {
    slideshow: Slideshow
    onClick: () => void
}

function SlideshowCard({ slideshow, onClick }: SlideshowCardProps) {
    return (
        <IonCard button onClick={onClick} className="w-full mb-4 cursor-pointer">
            <IonCardContent className="justify-between items-center py-4">
                <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold">{slideshow.title}</h2>
                    {slideshow.description && (
                        <p className="text-sm text-secondary mt-1">{slideshow.description}</p>
                    )}
                </div>
                <IonIcon icon={chevronForward} aria-label="view slideshow" className="text-2xl shrink-0 ml-2" />
            </IonCardContent>
        </IonCard>
    )
}

export default SlideshowCard
