import { IonCard, IonCardContent, IonButton, IonIcon } from '@ionic/react'
import { createOutline, trashOutline } from 'ionicons/icons'
import type { Slideshow } from '../../rtk/slideshows/slideshow-model'

interface SlideshowCardProps {
    slideshow: Slideshow
    onEdit: () => void
    onDelete: () => void
}

function SlideshowCard({ slideshow, onEdit, onDelete }: SlideshowCardProps) {
    return (
        <IonCard className="w-full mb-4">
            <IonCardContent className="flex justify-between items-center py-4">
                <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold">{slideshow.title}</h2>
                    {slideshow.description && (
                        <p className="text-sm text-secondary mt-1">{slideshow.description}</p>
                    )}
                </div>
                <div className="flex gap-1 shrink-0">
                    <IonButton fill="clear" color="primary" onClick={onEdit} aria-label="edit slideshow">
                        <IonIcon icon={createOutline} />
                    </IonButton>
                    <IonButton fill="clear" color="danger" onClick={onDelete} aria-label="delete slideshow">
                        <IonIcon icon={trashOutline} />
                    </IonButton>
                </div>
            </IonCardContent>
        </IonCard>
    )
}

export default SlideshowCard
