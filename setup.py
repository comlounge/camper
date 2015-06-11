from setuptools import setup, find_packages
import sys, os

version = '0.1'

setup(name='camper',
      version=version,
      description="Barcamp Tool",
      long_description="""
""",
      classifiers=[], # Get strings from http://pypi.python.org/pypi?%3Aaction=list_classifiers
      keywords='',
      author='COM.lounge',
      author_email='info@comlounge.net',
      url='',
      license='MIT',
      packages=find_packages(exclude=['ez_setup', 'examples', 'tests']),
      include_package_data=True,
      zip_safe=False,
      install_requires=[
        "starflyer",
        "PasteScript",
        "userbase",
        "sf-mail",
        "sf-uploader",
        "pyyaml",
        "pymongo",
        "postmeister",
        "mongogogo",
        "setuptools",
        "markdown",
        "xhtml2pdf",
        "sf-babel",
        "etherpad_lite",
        "requests",
        "xlwt",
        "bleach",
        "isodate",
      ],
      entry_points="""
          [paste.app_factory]
          main = camper.app:app
          [console_scripts]
          change_path = camper.scripts.change_path:change_path
          migrate_barcamps = camper.scripts.migrate_barcamps:migrate_barcamps
          migrate_users = camper.scripts.migrate_users:migrate_users
      """,
      )
