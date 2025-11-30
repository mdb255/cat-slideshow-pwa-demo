"""add user_id to cat and slideshow

Revision ID: 9a1b2c3d4e5f
Revises: 791b5de9a19f
Create Date: 2025-10-30
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9a1b2c3d4e5f'
down_revision = 'f02634167133'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add user_id columns as nullable initially
    op.add_column('cat', sa.Column('user_id', sa.Integer(), nullable=True))
    op.add_column('slideshow', sa.Column('user_id', sa.Integer(), nullable=True))

    # Create indexes
    op.create_index('ix_cat_user_id', 'cat', ['user_id'], unique=False)
    op.create_index('ix_slideshow_user_id', 'slideshow', ['user_id'], unique=False)

    # Add FKs (can be added before backfill in Postgres, allow NULLs)
    op.create_foreign_key('fk_cat_user_id_user', 'cat', 'user', ['user_id'], ['id'])
    op.create_foreign_key('fk_slideshow_user_id_user', 'slideshow', 'user', ['user_id'], ['id'])

    # Backfill existing rows to user id 1
    op.execute('UPDATE cat SET user_id = 1 WHERE user_id IS NULL')
    op.execute('UPDATE slideshow SET user_id = 1 WHERE user_id IS NULL')

    # Make columns non-nullable
    op.alter_column('cat', 'user_id', existing_type=sa.Integer(), nullable=False)
    op.alter_column('slideshow', 'user_id', existing_type=sa.Integer(), nullable=False)


def downgrade() -> None:
    # Drop constraints and columns
    op.alter_column('slideshow', 'user_id', existing_type=sa.Integer(), nullable=True)
    op.alter_column('cat', 'user_id', existing_type=sa.Integer(), nullable=True)
    op.drop_constraint('fk_slideshow_user_id_user', 'slideshow', type_='foreignkey')
    op.drop_constraint('fk_cat_user_id_user', 'cat', type_='foreignkey')
    op.drop_index('ix_slideshow_user_id', table_name='slideshow')
    op.drop_index('ix_cat_user_id', table_name='cat')
    op.drop_column('slideshow', 'user_id')
    op.drop_column('cat', 'user_id')


