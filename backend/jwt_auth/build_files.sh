python3 -m venv env
source env/bin/activate

pip install -r requirement.txt 
python3.9 manage.py collectstatic --noinput
# Run collectstatic to gather static files
# python manage.py collectstatic --noinput

# Create the build folder if it doesn't exist
mkdir -p staticfiles_build

# Move static files into the expected folder
cp -r staticfiles/* staticfiles_build/

# export DATABASE_URL='postgresql://postgres:rsryyszTqRCPNagcSDTqOhzmuwXLZZUf@junction.proxy.rlwy.net:31419/railway'