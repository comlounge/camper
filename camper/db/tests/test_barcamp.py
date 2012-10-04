from camper.db import BarcampSchema, Barcamp
import datetime

def test_simple(barcamps):
    barcamp = Barcamp(
        name = "Barcamp",
        description = "cool barcamp",
        slug = "barcamp",
        start_date = datetime.date(2012,7,13),
        end_date = datetime.date(2012,7,15)
    )
    barcamps.save(barcamp)
    
