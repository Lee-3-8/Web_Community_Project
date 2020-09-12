"""empty message

Revision ID: 7e637827d576
Revises: eb85bea3aa47
Create Date: 2020-09-08 13:28:45.532465

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '7e637827d576'
down_revision = 'eb85bea3aa47'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('ruser')
    op.add_column('board', sa.Column('post_num', sa.Integer(), nullable=True))
    op.add_column('post', sa.Column('comment_num', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('post', 'comment_num')
    op.drop_column('board', 'post_num')
    op.create_table('ruser',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('username', mysql.VARCHAR(length=80), nullable=True),
    sa.Column('birth', mysql.DATETIME(), nullable=True),
    sa.Column('userid', mysql.VARCHAR(length=32), nullable=True),
    sa.Column('password', mysql.VARCHAR(length=256), nullable=True),
    sa.Column('email', mysql.VARCHAR(length=32), nullable=True),
    sa.Column('nickname', mysql.VARCHAR(length=10), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    # ### end Alembic commands ###