import { IonCard, IonCardContent, IonButton, IonIcon } from '@ionic/react'
import { createOutline, trashOutline } from 'ionicons/icons'
import type { Cat } from '../../rtk/cats/cat-model'

interface CatCardProps {
    cat: Cat
    onEdit: () => void
    onDelete: () => void
}

function CatCard({ cat, onEdit, onDelete }: CatCardProps) {
    return (
        <IonCard className="w-full mb-4">
            <IonCardContent className="flex justify-between items-center py-4">
                <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-black">{cat.name}</h2>
                    {cat.breed && (
                        <p className="text-sm mt-1" style={{ color: 'var(--app-subtitle-color)' }}>{cat.breed}</p>
                    )}
                </div>
                <div className="flex gap-1 shrink-0">
                    <IonButton fill="clear" color="primary" onClick={onEdit} aria-label="edit cat">
                        <IonIcon icon={createOutline} />
                    </IonButton>
                    <IonButton fill="clear" color="danger" onClick={onDelete} aria-label="delete cat">
                        <IonIcon icon={trashOutline} />
                    </IonButton>
                </div>
            </IonCardContent>
        </IonCard>
    )
}

export default CatCard
