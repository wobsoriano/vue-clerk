rm -rf node_modules
rm -rf .turbo

for d in packages/*
do
    echo $d
    rm -r $d/node_modules $d/dist $d/.turbo
done

for d in apps/*
do
    echo $d
    rm -r $d/node_modules $d/dist $d/.turbo
done
