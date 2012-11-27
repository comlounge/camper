
import string
import os.path
import uuid

mapping = {
    196 : 'AE', 198 : 'AE', 214 : 'OE', 220 : 'UE', 223 : 'ss', 224 : 'a',
    228 : 'ae', 230 : 'ae', 246 : 'oe', 252 : 'ue'
}

def string2filename(s, path = None):
    """convert a string to a valid filename"""
    
    from unicodedata import decomposition, normalize

    # TODO: make sure that s is unicode (add check and conversion)
    
    s = s.strip()
    s = s.lower()

    # remove an eventual path
    s = s.replace("\\","/")
    _, s = os.path.split(s)
    
    res = u''
    mkeys = mapping.keys()
    for c in s:
        o = ord(c)
        if o in mapping.keys():
            res = res+mapping[o]
            continue
        if decomposition(c):
            res = res + normalize('NFKD', c)
        else:
            res = res + c
    
    valid_chars = "-_.() %s%s" % (string.ascii_letters, string.digits)
    filename = ''.join(c for c in res if c in valid_chars)
    filename = filename.replace(" ","-")
    
    # if path is not None we can check if there already is a file with that name
    if path is None:
        return filename
        
    fullpath=os.path.join(path, filename)
    if not os.path.exists(fullpath):
        return filename

    # remove the extension
    root, ext = os.path.splitext(filename)
        
    for idx in range(1,100):
        filename = "%s-%d%s" %(root, idx, ext)
        if not os.path.exists(os.path.join(path,filename)):
            return filename
            
    for idx in range(1,100):
        u = unicode(uuid.uuid4())
        filename = "%s-%s%s" %(root, u, ext)
        if not os.path.exists(os.path.join(path,filename)):
            return filename
        
    return None # we did not get a result, TODO: further checking
